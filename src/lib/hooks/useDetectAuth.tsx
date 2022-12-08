import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { PATH } from '../const/path';
import { getHasAccessToken } from '../utils/accessTokenStore';

const useDetectAuth = () => {
  const navigate = useNavigate();
  const { pathname } = window.location;
  useEffect(() => {
    const notRequireAccessTokenPage = [PATH.SIGN_IN, PATH.SIGN_UP];
    const requireAccessTokenPage = [PATH.TODO];
    if (pathname) {
      const hasAccessToken = getHasAccessToken();
      if (notRequireAccessTokenPage.includes(pathname) && hasAccessToken) {
        navigate(PATH.TODO, { replace: true });
      }
      if (requireAccessTokenPage.includes(pathname) && !hasAccessToken) {
        navigate(PATH.SIGN_IN, { replace: true });
      }
    }
  }, [pathname]);
};

export default useDetectAuth;
