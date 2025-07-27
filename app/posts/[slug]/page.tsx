// app/posts/[slug]/page.tsx
import { getPostBySlug, getAllPosts } from '@/lib/cosmic'
import { Post } from '@/types'
import { formatDate, getReadingTime, getTagsArray } from '@/lib/utils'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug) as Post | null

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.metadata?.excerpt || 'Read this blog post',
    openGraph: {
      title: post.title,
      description: post.metadata?.excerpt || 'Read this blog post',
      images: post.metadata?.featured_image?.imgix_url ? [
        {
          url: `${post.metadata.featured_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`,
          width: 1200,
          height: 630,
        }
      ] : [],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug) as Post | null

  if (!post) {
    notFound()
  }

  const tags = getTagsArray(post.metadata?.tags)
  const readingTime = getReadingTime(post.metadata?.content)
  const author = post.metadata?.author
  const category = post.metadata?.category

  return (
    <article className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-12">
          <div className="mb-6">
            {category && (
              <Link
                href={`/categories/${category.slug}`}
                className="inline-block"
              >
                <span
                  className="px-3 py-1 text-sm font-medium text-white rounded-full"
                  style={{ backgroundColor: category.metadata?.color || '#6B7280' }}
                >
                  {category.metadata?.name || category.title}
                </span>
              </Link>
            )}
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {post.title}
          </h1>
          
          {post.metadata?.excerpt && (
            <p className="text-xl text-gray-600 mb-8">
              {post.metadata.excerpt}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
            {author && (
              <Link
                href={`/authors/${author.slug}`}
                className="flex items-center gap-3 hover:text-gray-700"
              >
                {author.metadata?.avatar && (
                  <img
                    src={`${author.metadata.avatar.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                    alt={author.metadata?.name || author.title}
                    className="w-10 h-10 rounded-full object-cover"
                    width={40}
                    height={40}
                  />
                )}
                <span className="font-medium">
                  {author.metadata?.name || author.title}
                </span>
              </Link>
            )}
            <time dateTime={post.created_at}>
              {formatDate(post.created_at)}
            </time>
            {readingTime > 0 && (
              <span>{readingTime} min read</span>
            )}
          </div>
        </header>

        {/* Featured Image */}
        {post.metadata?.featured_image && (
          <div className="mb-12">
            <img
              src={`${post.metadata.featured_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
              alt={post.title}
              className="w-full h-96 object-cover rounded-lg"
              width={1200}
              height={600}
            />
          </div>
        )}

        {/* Content */}
        {post.metadata?.content && (
          <div
            className="prose prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: post.metadata.content }}
          />
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mb-12">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Author Bio */}
        {author && author.metadata?.bio && (
          <div className="border-t pt-12">
            <div className="flex items-start gap-6">
              {author.metadata?.avatar && (
                <img
                  src={`${author.metadata.avatar.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                  alt={author.metadata?.name || author.title}
                  className="w-20 h-20 rounded-full object-cover flex-shrink-0"
                  width={80}
                  height={80}
                />
              )}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  About {author.metadata?.name || author.title}
                </h3>
                <p className="text-gray-600 mb-4">{author.metadata.bio}</p>
                <div className="flex gap-4">
                  {author.metadata?.twitter && (
                    <a
                      href={`https://twitter.com/${author.metadata.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600"
                    >
                      Twitter
                    </a>
                  )}
                  {author.metadata?.linkedin && (
                    <a
                      href={author.metadata.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  )
}