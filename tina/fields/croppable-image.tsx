import React, { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { wrapFieldsWithMeta, useCMS } from 'tinacms'
import { Scissors, RotateCw, X, Check, AlertCircle } from 'lucide-react'

// Helper to create the cropped image
const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number },
  rotation = 0
): Promise<Blob> => {
  const image = new Image()
  image.src = imageSrc
  await new Promise((resolve, reject) => {
    image.onload = resolve
    image.onerror = reject
  })

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) throw new Error('No 2d context')

  const rotRad = (rotation * Math.PI) / 180
  const { width: bBoxW, height: bBoxH } = rotateSize(image.width, image.height, rotation)

  canvas.width = bBoxW
  canvas.height = bBoxH

  ctx.translate(bBoxW / 2, bBoxH / 2)
  ctx.rotate(rotRad)
  ctx.translate(-image.width / 2, -image.height / 2)

  ctx.drawImage(image, 0, 0)

  const data = ctx.getImageData(
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height
  )

  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height

  ctx.putImageData(data, 0, 0)

  return new Promise((resolve, reject) => {
    canvas.toBlob((file) => {
      if (file) resolve(file)
      else reject(new Error('Canvas toBlob failed'))
    }, 'image/jpeg')
  })
}

const rotateSize = (width: number, height: number, rotation: number) => {
  const rotRad = (rotation * Math.PI) / 180
  return {
    width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  }
}

export const CroppableImageField = wrapFieldsWithMeta(({ input, field }) => {
  const cms = useCMS()
  const [isCropping, setIsCropping] = useState(false)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const onCropComplete = useCallback((_croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const handleCrop = async () => {
    setError(null)
    setIsProcessing(true)
    try {
      const croppedImageBlob = await getCroppedImg(
        input.value,
        croppedAreaPixels,
        rotation
      )
      
      const fileName = `cropped-${Date.now()}.jpg`
      const file = new File([croppedImageBlob], fileName, { type: 'image/jpeg' })
      
      // Upload to Tina Media Store
      const directory = (field as any).uploadDir || 'uploads/team'
      const [mediaRes] = await cms.media.persist([{
        directory,
        file
      }])

      if (mediaRes) {
        input.onChange(mediaRes.src)
        setIsCropping(false)
      }
    } catch (e: any) {
      console.error(e)
      setError(e.message || 'Failed to crop and upload image')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="mb-4 text-black font-sans">
      <label className="block text-xs font-semibold mb-2 text-gray-500 uppercase tracking-wide">
        {field.label || field.name}
      </label>
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <input
            type="text"
            className="w-full bg-white border border-gray-200 px-3 py-2 text-sm text-black"
            {...input}
            readOnly
          />
        </div>
        <button
          type="button"
          onClick={() => cms.media.open({
            onSelect: (media: any) => {
              input.onChange(media.src)
            }
          })}
          className="bg-gray-100 hover:bg-gray-200 px-3 py-2 text-sm transition-colors text-black font-medium border border-gray-300"
        >
          Select
        </button>
        {input.value && (
          <button
            type="button"
            onClick={() => setIsCropping(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 text-sm transition-colors flex items-center gap-2 font-medium"
          >
            <Scissors size={14} />
            Crop
          </button>
        )}
      </div>

      {error && (
        <div className="mt-2 p-2 bg-red-50 border border-red-100 text-red-600 text-xs flex items-center gap-2 rounded">
          <AlertCircle size={14} />
          {error}
        </div>
      )}

      {isCropping && (
        <div className="fixed inset-0 z-[1000] bg-black flex flex-col font-sans">
          <div className="flex items-center justify-between p-4 bg-gray-900 text-white border-b border-white/10">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Scissors size={20} className="text-blue-400" />
              Image Studio
            </h3>
            <div className="flex items-center gap-6">
               <div className="flex items-center gap-3">
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Zoom</span>
                  <input
                    type="range"
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    aria-labelledby="Zoom"
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="w-32 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
               </div>
               <button
                onClick={() => setRotation((r) => (r + 90) % 360)}
                className="p-2 hover:bg-white/10 rounded transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
                title="Rotate 90deg"
              >
                <RotateCw size={18} className="text-blue-400" />
                Rotate
              </button>
               <button
                onClick={() => {
                  setIsCropping(false)
                  setError(null)
                }}
                className="flex items-center gap-2 px-4 py-2 hover:bg-white/10 rounded transition-colors text-xs font-bold uppercase tracking-wider"
              >
                <X size={18} />
                Cancel
              </button>
              <button
                onClick={handleCrop}
                disabled={isProcessing}
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded transition-all text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-900/20"
              >
                {isProcessing ? 'Processing...' : (
                  <>
                    <Check size={18} />
                    Finalize Crop
                  </>
                )}
              </button>
            </div>
          </div>
          
          <div className="relative flex-1 bg-[#0a0a0a]">
            <Cropper
              image={input.value}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={(field as any).aspect || 1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
          
          {error && (
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 p-4 bg-red-600 text-white rounded-lg shadow-2xl flex items-center gap-3 animate-bounce">
              <AlertCircle size={20} />
              <span className="font-bold uppercase tracking-wide text-xs">{error}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
})
