 const downloadXLSFile = async () => {
    // Its important to set the 'Content-Type': 'blob' and responseType:'arraybuffer'.
    const headers = {
      'Content-Type': 'blob',
      authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTQsInJvbGVfaWQiOjQsImV4cCI6MTY1NTM3NzE5NiwiaWF0IjoxNjU1MzU1NTk2fQ.hP2omubSnZzk5YJVKfMqcn1rbtyl-O8ou1ivv4bC6q8`,
    };
    let url =
      'https://radxup-cde-dev.azurewebsites.net/api/cde/cdeliblangtemplate?query=eyJuYW1lIjoiRnJlc2ggQ0RFIExpYiIsInZlcnNpb24iOiIyLjAifQ==';
    const config = { method: 'GET', url, responseType: 'arraybuffer', headers };

    try {
      const response = await axios(config);

      const outputFilename = `${Date.now()}.xlsx`;

      // If you want to download file automatically using link attribute.
      const url = URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', outputFilename);
      document.body.appendChild(link);
      link.click();

      // OR you can save/write file locally.
      // fs.writeFileSync(outputFilename, response.data);
    } catch (error) {
      throw Error(error);
    }
  };
