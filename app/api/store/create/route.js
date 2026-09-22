// create the store

import imagekit from "@/configs/imageKit";
import prisma from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

async function getOrCreateUser(userId) {
  let user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    try {
      const client = await clerkClient();
      const clerkUser = await client.users.getUser(userId);

      user = await prisma.user.create({
        data: {
          id: userId,
          name:
            `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() ||
            "User",
          email: clerkUser.emailAddresses[0].emailAddress,
          image: clerkUser.imageUrl || "",
        },
      });
    } catch (error) {
      console.log("Error fetching from Clerk:", error);
      throw new Error("Failed to create user");
    }
  }

  return user;
}

export async function POST(request) {
  try {
    // Get logged-in user
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Not Authorized" }, { status: 401 });
    }

    await getOrCreateUser(userId);

    // Get data from the form
    const formData = await request.formData();

    const name = formData.get("name");
    const username = formData.get("username");
    const description = formData.get("description");
    const email = formData.get("email");
    const contact = formData.get("contact");
    const address = formData.get("address");
    const image = formData.get("image");

    // Validate store information
    if (
      !name ||
      !username ||
      !description ||
      !email ||
      !contact ||
      !address ||
      !(image instanceof File)
    ) {
      return NextResponse.json(
        { error: "Missing store info or invalid image" },
        { status: 400 },
      );
    }

    // Check if user already registered a store
    const store = await prisma.store.findFirst({
      where: { userId: userId },
    });

    // If store already exists, send its status
    if (store) {
      return NextResponse.json({
        status: store.status,
      });
    }

    // Check if username is already taken
    const isUsernameTaken = await prisma.store.findFirst({
      where: {
        username: username.toLowerCase(),
      },
    });

    if (isUsernameTaken) {
      return NextResponse.json(
        {
          error:
            "Username is already taken by another user. Please try a different one.",
        },
        { status: 400 },
      );
    }

    // --------------------------------
    // Upload image to ImageKit
    // --------------------------------

    const buffer = Buffer.from(await image.arrayBuffer());

    // Convert Buffer to Base64
    const base64File = buffer.toString("base64");

    const response = await imagekit.files.upload({
      file: base64File,
      fileName: image.name,
      folder: "logos",
    });

    console.log("ImageKit upload successful:", response);

    // Create optimized ImageKit URL
    const optimizedImage = imagekit.helper.buildSrc({
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
      src: response.url,
      transformation: [
        {
          quality: "auto",
          format: "webp",
          width: "512",
        },
      ],
    });

    // --------------------------------
    // Create store in database
    // --------------------------------

    const newStore = await prisma.store.create({
      data: {
        userId,
        name,
        description,
        username: username.toLowerCase(),
        email,
        contact,
        address,
        logo: optimizedImage,
      },
    });

    // Link store to user
    await prisma.user.update({
      where: { id: userId },
      data: {
        store: {
          connect: {
            id: newStore.id,
          },
        },
      },
    });

    return NextResponse.json({
      message: "Applied, waiting for approval by the admin.",
    });
  } catch (error) {
    console.log("Create store error:", error);

    return NextResponse.json(
      {
        error: error.code || error.message,
      },
      { status: 400 },
    );
  }
}

// Check if user has already registered a store
export async function GET(request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Not Authorized" }, { status: 401 });
    }

    const store = await prisma.store.findFirst({
      where: { userId: userId },
    });

    // If store exists, send status
    if (store) {
      return NextResponse.json({
        status: store.status,
      });
    }

    return NextResponse.json({
      status: "Not registered",
    });
  } catch (error) {
    console.log("Get store error:", error);

    return NextResponse.json(
      {
        error: error.code || error.message,
      },
      { status: 400 },
    );
  }
}
