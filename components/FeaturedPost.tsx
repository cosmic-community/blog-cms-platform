import Link from 'next/link'
import { Post } from '@/types'
import { formatDate, truncateText } from '@/lib/utils'

interface FeaturedPostProps {
  post: Post
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  const author = post.metadata?.author
  const category = post.metadata?.category
  const featuredImage = post.metadata?.featured_image

  return (
    <article className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Image */}
        {featuredImage && (
          <div className="relative">
            <img
              src={`${featuredImage.imgix_url}?w=1200&h=800&fit=crop&auto=format,compress`}
              alt={post.title}
              className="w-full h-80 lg:h-full object-cover"
              width={600}
              height={400}
            />
            {/* Featured Badge */}
            <div className="absolute top-4 left-4">
              <span className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                Featured
              </span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          {/* Category */}
          {category && (
            <div className="mb-4">
              <Link href={`/categories/${category.slug}`}>
                <span
                  className="inline-block px-4 py-2 text-sm font-semibold text-white rounded-full hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: category.metadata?.color || '#6B7280' }}
                >
                  {category.metadata?.name || category.title}
                </span>
              </Link>
            </div>
          )}

          {/* Title */}
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            <Link
              href={`/posts/${post.slug}`}
              className="hover:text-primary-600 transition-colors"
            >
              {post.title}
            </Link>
          </h2>

          {/* Excerpt */}
          {post.metadata?.excerpt && (
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {truncateText(post.metadata.excerpt, 180)}
            </p>
          )}

          {/* Meta and CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {author && (
                <Link
                  href={`/authors/${author.slug}`}
                  className="flex items-center gap-3 hover:text-primary-600 transition-colors"
                >
                  {author.metadata?.avatar && (
                    <img
                      src={`${author.metadata.avatar.imgix_url}?w=100&h=100&fit=crop&auto=format,compress`}
                      alt={author.metadata?.name || author.title}
                      className="w-10 h-10 rounded-full object-cover"
                      width={40}
                      height={40}
                    />
                  )}
                  <div>
                    <p className="font-semibold text-gray-900">
                      {author.metadata?.name || author.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatDate(post.created_at)}
                    </p>
                  </div>
                </Link>
              )}
            </div>

            <Link
              href={`/posts/${post.slug}`}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}