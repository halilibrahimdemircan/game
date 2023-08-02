import SideBarSection from './SideBarSection'
import homeicon from '../../../utils/icons/homeicon.svg'
import TrackerSideBarIcon from '../../../utils/icons/TrackerSideBarIcon.svg'
import PluggineIcon from '../../../utils/icons/PluggineIcon.svg'
import AppsIcon from '../../../utils/icons/AppsIcon.svg'
import nftgrayIcon from '../../../utils/icons/nftgrayIcon.svg'

const SideBar = () => {
  return (
    <div className="flex flex-col items-center w-full gap-4 p-4">
      <SideBarSection icon={homeicon} title={'Panel'} to="/" />
      <SideBarSection
        icon={TrackerSideBarIcon}
        title={'MushTrack'}
        to="https://tracker.mushboomers.com/"
      />
      <SideBarSection
        icon={nftgrayIcon}
        title={'NFTinit'}
        to="https://nftinit.com/"
      />
      {/* <SideBarSection icon={PluggineIcon} title={'Pluggine'} to={''} /> */}
    </div>
  )
}

export default SideBar
