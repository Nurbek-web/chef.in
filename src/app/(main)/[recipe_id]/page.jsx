"use client"

import { useParams } from 'next/navigation'

export default function Page() {
  const { recipe_id } = useParams();

  return <p>Post: {recipe_id}</p>
}