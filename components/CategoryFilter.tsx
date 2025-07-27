import Link from 'next/link'
import { Category } from '@/types'

interface CategoryFilterProps {
  categories: Category[]
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  if (categories.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No categories available.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap gap-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/categories/${category.slug}`}
          className="group relative overflow-hidden rounded-lg p-6 hover:shadow-lg transition-all duration-300"
          style={{ backgroundColor: `${category.metadata?.color || '#6B7280'}15` }}
        >
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: category.metadata?.color || '#6B7280' }}
              />
              <h3 className="text-lg font-semibold text-gray-900">
                {category.metadata?.name || category.title}
              </h3>
            </div>
            {category.metadata?.description && (
              <p className="text-gray-600 text-sm leading-relaxed">
                {category.metadata.description}
              </p>
            )}
          </div>
          
          {/* Hover effect */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
            style={{ backgroundColor: category.metadata?.color || '#6B7280' }}
          />
        </Link>
      ))}
    </div>
  )
}