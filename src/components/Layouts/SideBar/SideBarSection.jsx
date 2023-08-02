import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import sideBarArrowIcon from '../../../utils/icons/sideBarArrowIcon.svg'
import nftinitSideBarMorIcon from '../../../utils/icons/nftinitSideBarMorIcon.svg'
import nftgrayIcon from '../../../utils/icons/nftgrayIcon.svg'

const SideBarSection = ({ icon, title, to }) => {
  const [onMouseHover, setOnMouseHover] = useState(false)
  return (
    <>
      {title === 'Panel' ? (
        <Link to={to}>
          <div
            className={`has-tooltip w-10 h-10 rounded flex justify-center items-center`}
          >
            <img src={icon} alt="icon" className={`side-Bar-img-Icon`} />
            <div className="hidden lg:flex">
              <div
                style={{ borderRadius: '5px' }}
                className={`tooltip shadow-lg px-2 py-1 bg-#0066FF text-white -mt-3 text-center text-sm flex justify-center items-center h-6 left-14`}
              >
                <p className="text-xs font-semibold leading-5.25 tooltip-arrow-panel flex items-center relative">
                  <span className="absolute -left-3.5">
                    <img src={sideBarArrowIcon} alt="" />
                  </span>
                  {title}
                </p>
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <>
          {title === 'MushTrack' || title === 'NFTinit' ? (
            <a
              href={to ? to : ''}
              target="_blank"
              className={`has-tooltip w-10 h-10 rounded flex justify-center items-center`}
              onMouseEnter={() => setOnMouseHover(true)}
              onMouseLeave={() => setOnMouseHover(false)}
            >
              {title === 'NFTinit' ? (
                <img
                  src={`${onMouseHover ? nftinitSideBarMorIcon : nftgrayIcon}`}
                  alt="icon"
                />
              ) : (
                <img src={icon} alt="icon" className={`side-Bar-img-Icon`} />
              )}

              <div className="hidden lg:flex">
                <div
                  style={{ borderRadius: '5px' }}
                  className={`tooltip shadow-lg px-2 py-1 bg-#0066FF text-white -mt-3 text-center text-sm flex justify-center items-center h-6 left-14`}
                >
                  <p className="text-xs font-semibold leading-5.25 tooltip-arrow-panel flex items-center relative">
                    <span className="absolute -left-3.5">
                      <img src={sideBarArrowIcon} alt="" />
                    </span>
                    {title}
                  </p>
                </div>
              </div>
            </a>
          ) : (
            <div className="w-10 h-10 rounded flex justify-center items-center">
              <img src={icon} alt="" />
            </div>
          )}
        </>
      )}
    </>
  )
}

export default SideBarSection
