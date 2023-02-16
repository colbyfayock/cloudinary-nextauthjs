import { getSession } from 'next-auth/react';
import { getToken } from 'next-auth/jwt';
import { v2 as cloudinary } from 'cloudinary';

export default async (req, res) => {
  const session = await getSession({ req });
  const token = await getToken({
    req,
    secret: process.env.SECRET
  });

  let cloudName;

  try {
    const response = await fetch('https://api.cloudinary.com/v1_1/token/info', {
      headers: {
        Authorization: `Bearer ${token.cloudinary.accessToken}`
      }
    });

    const { cloud_name } = await response.json();

    cloudName = cloud_name;
  } catch(e) {
    console.log('e', e);
    return res.status(400).json({
      status: e.message
    });
  }

  cloudinary.config({
    cloud_name: cloudName,
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