// app/categories/[slug]/page.tsx
import { getCategoryBySlug, getPostsByCategory, getAllCategories } from '@/lib/cosmic'
import { Category, Post } from '@/types'
import PostCard from '@/components/PostCard'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const categories = await getAllCategories()
  return categories.map((category: Category) => ({
    slug: category.slug,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug) as Category | null

  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: `${category.metadata?.name || category.title} - Blog CMS Platform`,
    description: category.metadata?.description || `Posts in ${category.metadata?.name || category.title} category`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug) as Category | null

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id) as Post[]

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-4">
            <span
              className="inline-block px-4 py-2 text-lg font-semibold text-white rounded-full"
              style={{ backgroundColor: category.metadata?.color || '#6B7280' }}
            >
              {category.metadata?.name || category.title}
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {category.metadata?.name || category.title}
          </h1>
          {category.metadata?.description && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {category.metadata.description}
            </p>
          )}
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
              <Link href="/categories" className="hover:text-gray-700">
                Categories
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900">{category.metadata?.name || category.title}</li>
          </ol>
        </nav>

        {/* Posts */}
        {posts.length > 0 ? (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {posts.length} {posts.length === 1 ? 'Post' : 'Posts'}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: Post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              No posts in this category yet
            </h2>
            <p className="text-gray-600 mb-6">
              Check back later for new content in {category.metadata?.name || category.title}.
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