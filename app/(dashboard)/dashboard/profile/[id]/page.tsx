// app/(dashboard)/dashboard/profile/[id]/page.tsx
import { notFound } from 'next/navigation'

const dummyUser = [
  { id: '1', nama: 'Mamad Ahmad', alamat: 'Kabupaten Subang' }
]

export async function generateStaticParams() {
  return dummyUser.map((user) => ({
    id: user.id
  }))
}

export default function DetailProfilePage({
  params
}: {
  params: { id: string }
}) {
  const user = dummyUser.find((u) => u.id === params.id)

  if (!user) return notFound()

  return (
    <div className="p-6 bg-white text-gray-800">
      <h1 className="text-2xl font-bold text-emerald-600 mb-4">Detail Profile</h1>
      <div className="rounded-md shadow p-6 space-y-4 border">
        <p><strong>Nama:</strong> {user.nama}</p>
        <p><strong>Alamat:</strong> {user.alamat}</p>
      </div>
    </div>
  )
}
