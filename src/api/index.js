import axiosIns from '@/utils/axios';

export function getCodeImg(data) {
  return axiosIns({
    url: `/msgService/verifyCode/getVerificationCode`,
    method: 'get'
  });
}

export function sendVerifyCode(data) {
  return axiosIns({
    url: `/ncdpMemberShipService/v1/memberinfo/open/sendVerifyCode`,
    method: 'post',
    data
  });
}
export function checkVerifyCode(data) {
  return axiosIns({
    url: `/ncdpMemberShipService/v1/memberinfo/open/checkVerifyCode`,
    method: 'post',
    data
  });
}
export function determineAccountStatus(data) {
  return axiosIns({
    url: `/ncdcloudSaleService/DoctorsRegistration/determineAccountStatus`,
    method: 'get',
    params: data
  });
}

export function submitDoctorInfo(data) {
  return axiosIns({
    url: `/ncdcloudSaleService/DoctorsRegistration/submitDoctorInfo`,
    method: 'post',
    data: data
  });
}

// !医院
export const getListByPage = (data) => {
  return axiosIns({
    url: `/ncdpSystemService/v1/organizationManager/getListByPage`,
    method: 'post',
    data
  });
};

export function listServeOrganizationDepts(data) {
  return axiosIns({
    url: `/ncdpSystemService/v1/serveOrganization/listServeOrganizationDepts`,
    method: 'post',
    data: data
  });
}

export function getByType(data) {
  return axiosIns({
    url: `/ncdpSystemService/v1/staffDataDictionary/getByType`,
    method: 'get',
    params: data
  });
}

/* 图片 - 上传单张图片 */
export function uploadPicture(data) {
  return axiosIns({
    url: `/fileService/upload/uploadFile`,
    method: 'post',
    data: data
  });
}
/* 图片 - 上传多张图片 */
export function uploadMultiPicture(data) {
  return axiosIns({
    url: `/fileService/upload/uploadMultiFile`,
    method: 'post',
    data: data
  });
}
