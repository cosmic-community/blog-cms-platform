import Link from 'next/link'
import { Post } from '@/types'
import { formatDate, truncateText } from '@/lib/utils'

interface PostCardProps {
  post: Post
  className?: string
}

export default function PostCard({ post, className = '' }: PostCardProps) {
  const author = post.metadata?.author
  const category = post.metadata?.category
  const featuredImage = post.metadata?.featured_image

  return (
    <article className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${className}`}>
      {/* Featured Image */}
      {featuredImage && (
        <Link href={`/posts/${post.slug}`}>
          <div className="aspect-w-16 aspect-h-9 relative">
            <img
              src={`${featuredImage.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
              alt={post.title}
              className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              width={400}
              height={240}
            />
          </div>
        </Link>
      )}

      <div className="p-6">
        {/* Category */}
        {category && (
          <div className="mb-3">
            <Link href={`/categories/${category.slug}`}>
              <span
                className="inline-block px-3 py-1 text-xs font-semibold text-white rounded-full hover:opacity-80 transition-opacity"
                style={{ backgroundColor: category.metadata?.color || '#6B7280' }}
              >
                {category.metadata?.name || category.title}
              </span>
            </Link>
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          <Link
            href={`/posts/${post.slug}`}
            className="hover:text-primary-600 transition-colors"
          >
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        {post.metadata?.excerpt && (
          <p className="text-gray-600 mb-4 leading-relaxed">
            {truncateText(post.metadata.excerpt, 120)}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-3">
            {author && (
              <Link
                href={`/authors/${author.slug}`}
                className="flex items-center gap-2 hover:text-gray-700"
              >
                {author.metadata?.avatar && (
                  <img
                    src={`${author.metadata.avatar.imgix_url}?w=60&h=60&fit=crop&auto=format,compress`}
                    alt={author.metadata?.name || author.title}
                    className="w-6 h-6 rounded-full object-cover"
                    width={24}
                    height={24}
                  />
                )}
                <span className="font-medium">
                  {author.metadata?.name || author.title}
                </span>
              </Link>
            )}
          </div>
          <time dateTime={post.created_at}>
            {formatDate(post.created_at)}
          </time>
        </div>
      </div>
    </article>
  )
}