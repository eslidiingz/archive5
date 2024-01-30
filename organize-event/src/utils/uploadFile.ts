export const uploadFile = async (_file: File, _folder: string) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer`);

  const formdata = new FormData();
  formdata.append("documents", _file);
  formdata.append("folder", _folder);

  const requestOptions: object = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  try {
    const _result = await fetch(
      `${process.env.NEXT_PUBLIC_REST_CMS_UPLOAD_FILE}`,
      requestOptions
    );
    const _data = await _result.json();
    return `${process.env.NEXT_PUBLIC_GATEWAY_URL}/${_data?.upload?.result[0]}`;
  } catch (error) {
    console.log(
      `%c========== [Failed] upload file to server ==========`,
      `color:red`,
      error
    );
  }
};
