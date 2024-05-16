import '@/assets/css/components/DeviceList/Brand.css'

type BrandProp = {
  brandName: string
}

const Brand: React.FC<BrandProp> = ({ brandName }) => {
  const imgSource: string = `/images/brands/${brandName.toLowerCase()}.png`
  return (
    <div className='brand-image'>
      <img src={imgSource}></img>
    </div>
  )
}

export default Brand
