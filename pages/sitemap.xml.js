import { NextPageContext } from 'next';

const blogPostsXml = blogPosts => {
  // let latestPost = 0;
  // let postsXml = '';
  // blogPosts.map(post => {
  //   const postDate = Date.parse(post.createdAt);
  //   if (!latestPost || postDate > latestPost) {
  //     latestPost = postDate;
  //   }
  //   postsXml += `
  //   <url>
  //     <loc>${post.url}</loc>
  //     <lastmod>${postDate}</lastmod>
  //     <priority>0.80</priority>
  //   </url>`;
  // });
  // return {
  //   postsXml,
  //   latestPost,
  // };
};

const sitemapXml = blogPosts => {
  const { postsXml, latestPost } = blogPostsXml(blogPosts);
  return `
  <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://www.bergqvist.it/</loc>
      <lastmod>${latestPost}</lastmod>
      <priority>1.00</priority>
    </url>
    <url>
      <loc>https://www.bergqvist.it/about</loc>
      <priority>0.5</priority>
    </url>
    ${blogPostsXml}
  </urlset>`;
};

const Sitemap = () => {};

Sitemap.getInitialProps = async ({ res }) => {
  // const blogPosts = getBlogPosts();
  res.setHeader('Content-Type', 'text/xml');
  // res.write(sitemapXml(blogPosts));
  res.end();
};
