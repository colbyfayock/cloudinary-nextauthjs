import { getSession } from 'next-auth/react';
import { getToken } from 'next-auth/jwt';
import { v2 as cloudinary } from 'cloudinary';

export default async (req, res) => {
  const session = await getSession({ req });
  const token = await getToken({
    req,
    secret: process.env.SECRET
  });

  console.log('token.cloudinary.accessToken', token.cloudinary.accessToken)

  const response = await fetch('https://api.cloudinary.com/v1_1/token/info', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token.cloudinary.accessToken}`
    }
  });
  console.log('response', response)
  const data = await data.json();

  console.log('data', data)

  console.log('cloud_name', cloud_name)

  cloudinary.config({
    cloud_name,
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