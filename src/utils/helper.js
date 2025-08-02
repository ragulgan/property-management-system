
import { SESSION, SET_STORAGE, REGEX } from "../utils/constants";
import _ from "lodash";

export const setLocalStorage = (key, varToSet) => (localStorage.setItem(key, btoa(varToSet)))

export const getLocalStorage = (key) => {
  const getStorage = localStorage.getItem(key)
  try {
    return getStorage ? atob(getStorage) : false
  } catch (e) {
    return false
  }
}
export const unsetLocalStorage = () => (localStorage.clear())
export const removeLocalStorage = (key) => localStorage.removeItem(key);

export const getLocalStorageMenu = (key) => {
  const getStorage = localStorage.getItem(key);
  try {
    return getStorage ? atob(getStorage) : "";
  } catch (e) {
    return "";
  }
};

export const addEllipsis = (string, sliceUpTo) => {
  if (string && string.length >= 30) {
    return <span>{string.substring(0, sliceUpTo) + "..."}</span>;
  } else {
    return <span>{string}</span>;
  }
};

export const setDynamicPasswordRegex = (min, max) => {
  const variable = `(?=^.{${min || 7},${max || 14}}$)`
  const exp = `${variable}(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$`
  const regex = new RegExp(exp)
  return regex
}

export const handleAuthFail = (error) => {
  if (error === SESSION.AUTH_FAILED) {
    window.location.href = "/authorization-failed";
  }
};

export const getUserPermissions = (slug) => {
  const getUserMenuDetails = getLocalStorageMenu(SET_STORAGE.USER_MENU_DETAILS);
  if (getUserMenuDetails && getUserMenuDetails) {
    const getMenuList = JSON.parse(getUserMenuDetails);
    if (getMenuList && getMenuList.length > 0) {
      let val = [];
      _.forEach(getMenuList, (parent) => {
        const currentSlug = `/${parent.slug}`;
        if (parent && parent.submenu && parent.submenu.length > 0) {
          _.forEach(parent.submenu, (child) => {
            const currentSlug = `/${child.slug}`;
            if (currentSlug === slug) {
              const permissions =
                child.permissions && child.permissions.length > 0
                  ? child.permissions
                  : [];
              val = permissions;
            } else if (child && child.submenu && child.submenu.length > 0) {
              _.forEach(child.submenu, (grand) => {
                const currentSlug = `/${grand.slug}`;
                if (currentSlug === slug) {
                  const permissions =
                    grand.permissions && grand.permissions.length > 0
                      ? grand.permissions
                      : [];
                  val = permissions;
                }
              });
            }
          });
        } else if (currentSlug === slug) {
          const permissions =
            parent.permissions && parent.permissions.length > 0
              ? parent.permissions
              : [];
          val = permissions;
        }
      });
      return val;
    }
  } else {
    window.location.href = "/session-expired";
    unsetLocalStorage();
  }
};

export const capitalizeRemoveUnderscore = (str) => {
  const modifiedStr = str.replace(/_/g, ' ').toLowerCase();
  return modifiedStr.replace(/(?:^|\s)\S/g, (match) => match.toUpperCase());
};

export const validationFunc___ = (
  register,
  name,
  requiredErrorMessage,
  customValidator,
) => {
  const validationRules = {};

  if (requiredErrorMessage) {
    validationRules.required = requiredErrorMessage;
  }

  if (customValidator) {
    validationRules.validate = (value) => {
      const errorMessage = customValidator(value);
      return errorMessage || undefined;
    };
  }
  return register(name, validationRules);
};

export const validationFunc = (
  register,
  name,
  customValidator,
  requiredErrorMessage,
) => {
  const validationRules = {};

  if (requiredErrorMessage) {
    validationRules.required = requiredErrorMessage;
  }

  if (customValidator) {
    validationRules.validate = (value) => {
      const errorMessage = customValidator(value);
      return errorMessage || undefined;
    };
  }
  return register(name, validationRules);
};

export const letNumericOnly = (event) => {
  if (!/^\d+$/.test(event.key) && event.key !== 'Backspace') {
    event.preventDefault();
  }
};

// export const letAlphaNumericOnly = (event) => {
//   if (!REGEX.ALPHA_NUMERIC_CHARS.test(event.key) && event.key !== 'Backspace') {
//     event.preventDefault();
//   }
// };

export const letSpeceficCharsOnly = (event, pattern) => {
  if (!pattern.test(event.key) && event.key !== 'Backspace') {
    event.preventDefault();
  }
};

export const downloadFiles = (uri) => {
  const link = document.createElement('a')
  const url = window.URL || window.webkitURL
  const revokeUrlAfterSec = 1000
  link.href = uri
  link.download = true
  link.target = '_blank'
  document.body.append(link)
  link.click()
  link.remove()
  setTimeout(() => url.revokeObjectURL(link.href), revokeUrlAfterSec)
}