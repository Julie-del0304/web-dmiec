import { PageContent } from '../services/pageContentService';

interface PageContentBlockProps {
  content: PageContent;
}

export default function PageContentBlock({ content }: PageContentBlockProps) {
  return (
    <div className="mb-12">
      {content.section_title && (
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          {content.section_title}
        </h2>
      )}

      {content.body_text && (
        <div className="prose max-w-none mb-8">
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {content.body_text}
          </p>
        </div>
      )}

      {content.image_urls && content.image_urls.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {content.image_urls.map((url, index) => (
            <div key={index} className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <img
                src={url}
                alt={`${content.section_title || 'Content'} image ${index + 1}`}
                className="w-full h-64 object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {content.pdf_urls && content.pdf_urls.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <i className="ri-file-pdf-line text-red-600"></i>
            PDF Documents
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.pdf_urls.map((url, index) => (
              <a
                key={index}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
              >
                <i className="ri-file-pdf-fill text-3xl text-red-600"></i>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">PDF Document {index + 1}</p>
                  <p className="text-sm text-gray-600">Click to download</p>
                </div>
                <i className="ri-download-line text-xl text-red-600"></i>
              </a>
            ))}
          </div>
        </div>
      )}

      {content.doc_urls && content.doc_urls.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <i className="ri-file-word-line text-blue-600"></i>
            Word Documents
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.doc_urls.map((url, index) => (
              <a
                key={index}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <i className="ri-file-word-fill text-3xl text-blue-600"></i>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">Word Document {index + 1}</p>
                  <p className="text-sm text-gray-600">Click to download</p>
                </div>
                <i className="ri-download-line text-xl text-blue-600"></i>
              </a>
            ))}
          </div>
        </div>
      )}

      {content.video_url && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <i className="ri-video-line text-purple-600"></i>
            Video
          </h3>
          <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
            {content.video_url.includes('youtube.com') || content.video_url.includes('youtu.be') ? (
              <iframe
                src={content.video_url.replace('watch?v=', 'embed/')}
                title="Video content"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <video
                src={content.video_url}
                controls
                className="w-full h-full object-cover"
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
