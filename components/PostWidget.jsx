import React, { useState, useEffect } from 'react'
import moment from 'moment'
import Link from 'next/link'

import { getRecentPosts, getSimilarPosts } from '../services'

const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([])

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) =>
        setRelatedPosts(result)
      )
    } else {
      getRecentPosts().then((result) => setRelatedPosts(result))
    }
  }, [slug])

  return (
    <div className="mb-8 cursor-pointer rounded-lg bg-white p-8 shadow-lg">
      <h3 className="mb-8 border-b pb-4 text-xl font-semibold">
        {slug ? 'Related Posts' : 'Recent Posts'}
      </h3>
      {relatedPosts.map((post) => (
        <Link href={`/post/${post.slug}`} key={post.title}>
          <div
            key={post.title}
            className="mb-4 flex w-full items-center rounded-md p-1 hover:bg-gray-300"
          >
            <div className="w-16 flex-none">
              <img
                alt={post.title}
                height="60px"
                width="60px"
                className="rounded-md align-middle"
                src={post.featuredImage.url}
              />
            </div>
            <div className="ml-4 flex-grow">
              <p className="text-xs text-gray-500">
                {moment(post.createdAt).format('MMM DD, YYYY')}
              </p>
              <h4 className="text-md">{post.title}</h4>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default PostWidget
