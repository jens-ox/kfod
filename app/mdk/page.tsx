import { MdkRenderer } from './MdkRenderer'
import mdk from '@/data/mdk.json'

export default async () => {
  return (
    <div className="grow overflow-x-hidden">
      <MdkRenderer mdk={mdk} />
    </div>
  )
}
