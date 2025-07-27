import { getAllPosts, getFeaturedPosts, getAllCategories } from '@/lib/cosmic'
import { Post, Category } from '@/types'
import PostCard from '@/components/PostCard'
import FeaturedPost from '@/components/FeaturedPost'
import CategoryFilter from '@/components/CategoryFilter'

export default async function HomePage() {
  const [posts, featuredPosts, categories] = await Promise.all([
    getAllPosts(),
    getFeaturedPosts(),
    getAllCategories()
  ])

  const typedPosts = posts as Post[]
  const typedFeaturedPosts = featuredPosts as Post[]
  const typedCategories = categories as Category[]

  const mainFeaturedPost = typedFeaturedPosts[0]
  const regularPosts = typedPosts.filter(post => !post.metadata?.featured)

  return (
    <div className="min-h-screen">
      {/* Hero Section with Featured Post */}
      {mainFeaturedPost && (
        <section className="bg-gradient-to-br from-gray-50 to-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4">
                Welcome to Our Blog
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover insights, stories, and expertise across technology, lifestyle, and travel
              </p>
            </div>
            <FeaturedPost post={mainFeaturedPost} />
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
            <CategoryFilter categories={typedCategories} />
          </div>

          {/* Recent Posts */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Latest Posts</h2>
            {regularPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No posts available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}