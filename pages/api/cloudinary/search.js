import { getSession } from 'next-auth/react';
import { getToken } from 'next-auth/jwt';
import { v2 as cloudinary } from 'cloudinary';

export default async (req, res) => {
  const session = await getSession({ req });
  const token = await getToken({
    req,
    secret: process.env.SECRET
  });

  cloudinary.config({
    cloud_name: 'fay',
    oauth_token: token.cloudinary.accessToken
  });

  try {
    const resources = await cloudinary.api.resources();

    return res.status(200).json({
      status: 'Ok',
      data: resources
    });
  } catch(e) {
    return res.status(400).json({
      status: e.message
    });
  }
}