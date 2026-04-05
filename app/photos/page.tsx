import Nav from '../components/Nav'
import Footer from '../components/Footer'
import PhotosGrid from '../components/PhotosGrid'
import { getPhotos } from '../../lib/notion'

export default async function PhotosPage() {
  // @ts-ignore
  const raw = await getPhotos()

  const photos = raw.map((photo: any) => {
    const props    = photo.properties
    const name     = props.Name?.title?.[0]?.plain_text ?? ''
    const caption  = props.Caption?.rich_text?.[0]?.plain_text ?? ''
    const location = props.Location?.rich_text?.[0]?.plain_text
      ?? props.Location?.select?.name ?? ''
    const date     = props.Date?.date?.start ?? ''
    const featured = props.Featured?.checkbox ?? false
    const filesProp = props.Photo ?? props.Image ?? props.File
    const file      = filesProp?.files?.[0]
    const src       = file?.type === 'external' ? file.external.url
                    : file?.type === 'file'     ? file.file.url
                    : null
    return { id: photo.id, src, caption, location, date, name, featured }
  })

  return (
    <main>
      <Nav />
      <div className="container">
        <div style={{ padding: '4rem 0 3rem' }}>
          <p className="section-label">shots</p>
          <h1 style={{ fontSize: '32px', fontWeight: 500, letterSpacing: '-0.02em' }}>
            photos
          </h1>
        </div>
        <PhotosGrid photos={photos} />
        <Footer />
      </div>
    </main>
  )
}
