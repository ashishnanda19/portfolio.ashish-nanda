import Link from "next/link";
import BlogTemplate from "@/components/Blog/BlogTemplate";
import ViewMoreButton from "@/components/Home/ViewMoreButton";
import { Blogs } from "@/data/blogs";

const HomeBlogs = () => {
  const featured = Blogs.slice(0, 2);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-4">
      <Link
        href="/blog"
        className="jap text-3xl mb-4 block hover:opacity-80 transition-opacity"
      >
        Blogs
      </Link>
      {featured.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
          {featured.map((blog, index) => (
            <BlogTemplate
              key={index}
              title={blog.title}
              description={blog.description}
              date={blog.date}
              readTime={blog.readTime}
              link={blog.link}
              tags={blog.tags}
            />
          ))}
        </div>
      ) : (
        <p className="smalll text-sm text-black/55 dark:text-white/55">
          Coming soon.
        </p>
      )}
      <div className="w-full flex justify-center mt-6">
        <ViewMoreButton href="/blog" label="View More" />
      </div>
    </div>
  );
};

export default HomeBlogs;
