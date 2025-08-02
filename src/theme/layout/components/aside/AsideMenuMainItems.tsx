import React from 'react'
import { getLocalStorageMenu } from '../../../../utils/helper';
import { SET_STORAGE } from '../../../../utils/constants';
import { AsideMenuItemWithSub } from './AsideMenuItemWithSub';
import { AsideMenuItem } from './AsideMenuItem';

const AsideMenuMain: React.FC<any> = ({ }) => {
  const getUserMenuDetails = getLocalStorageMenu(SET_STORAGE.USER_MENU_DETAILS)
  const getMenuList = getUserMenuDetails && getUserMenuDetails ? JSON.parse(getUserMenuDetails) : null

  return (
    <div>
      {
        getMenuList && getMenuList.map((menu, i) => (
          <div key={i}>
            {
              menu && menu.submenu && menu.submenu.length === 0 ? (
                <AsideMenuItem
                  to={`/${menu.slug}`}
                  title={menu.component}
                  fontIcon={menu.fontIcon}
                  icon={menu.parenticon || menu.favicon}
                />
              ) : (
                <AsideMenuItemWithSub
                  to={menu.slug}
                  icon={menu.favicon}
                  title={menu.component}
                  fontIcon={menu.fontIcon}
                >
                  {
                    menu && menu.submenu && menu.submenu.map((child, id) => (
                      <div key={id}>
                        {
                          child && child.submenu && child.submenu.length > 0 ?
                            (
                              <AsideMenuItemWithSub
                                to={child.slug}
                                title={child.component}
                                hasBullet
                              >
                                {
                                  child && child.submenu && child.submenu.map((subChild, index) => (
                                    <div key={index}>
                                      <AsideMenuItem
                                        to={subChild.slug}
                                        title={subChild.component}
                                        hasBullet
                                      />
                                    </div>
                                  ))
                                }
                              </AsideMenuItemWithSub>
                            ) : (
                              <AsideMenuItem
                                to={`/${child.slug}`}
                                title={child.component}
                                icon={child.favicon}
                                hasBullet={child.favicon ? false : true}
                              />
                            )
                        }
                      </div>
                    ))
                  }
                </AsideMenuItemWithSub>
              )
            }
          </div>
        ))
      }
    </div>
  )
}

export default AsideMenuMain