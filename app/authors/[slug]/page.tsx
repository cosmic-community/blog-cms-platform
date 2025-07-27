// app/authors/[slug]/page.tsx
import { getAuthorBySlug, getPostsByAuthor, getAllAuthors } from '@/lib/cosmic'
import { Author, Post } from '@/types'
import PostCard from '@/components/PostCard'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface AuthorPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const authors = await getAllAuthors()
  return authors.map((author) => ({
    slug: author.slug,
  }))
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params
  const author = await getAuthorBySlug(slug) as Author | null

  if (!author) {
    return {
      title: 'Author Not Found',
    }
  }

  return {
    title: `${author.metadata?.name || author.title} - Blog CMS Platform`,
    description: author.metadata?.bio || `Posts by ${author.metadata?.name || author.title}`,
  }
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug) as Author | null

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id) as Post[]

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Author Header */}
        <div className="text-center mb-12">
          {author.metadata?.avatar && (
            <div className="mb-6">
              <img
                src={`${author.metadata.avatar.imgix_url}?w=240&h=240&fit=crop&auto=format,compress`}
                alt={author.metadata?.name || author.title}
                className="w-32 h-32 rounded-full object-cover mx-auto"
                width={128}
                height={128}
              />
            </div>
          )}
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {author.metadata?.name || author.title}
          </h1>
          {author.metadata?.bio && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              {author.metadata.bio}
            </p>
          )}
          
          {/* Social Links */}
          <div className="flex justify-center gap-4">
            {author.metadata?.twitter && (
              <a
                href={`https://twitter.com/${author.metadata.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Twitter
              </a>
            )}
            {author.metadata?.linkedin && (
              <a
                href={author.metadata.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                LinkedIn
              </a>
            )}
            {author.metadata?.email && (
              <a
                href={`mailto:${author.metadata.email}`}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Email
              </a>
            )}
          </div>
        </div>

        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-gray-700">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/authors" className="hover:text-gray-700">
                Authors
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900">{author.metadata?.name || author.title}</li>
          </ol>
        </nav>

        {/* Posts */}
        {posts.length > 0 ? (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {posts.length} {posts.length === 1 ? 'Post' : 'Posts'} by {author.metadata?.name || author.title}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              No posts by this author yet
            </h2>
            <p className="text-gray-600 mb-6">
              Check back later for new content from {author.metadata?.name || author.title}.
            </p>
            <Link
              href="/"
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors"
            >
              Browse All Posts
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}