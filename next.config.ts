/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        // تعليق: بنسمح لصور Unsplash تشتغل في المشروع
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        // تعليق: ضيفنا ده كمان عشان الصور الشخصية اللي استخدمناها في الكود
      },
    ],
  },
};

module.exports = nextConfig;