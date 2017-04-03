export function getFullLink(endpoint, group) {
  const basePath = `http://startjoin.com/api/v1${group.fullPath}`;

  if (endpoint.params) {
    const mainParam = endpoint.params.find(p => p.main);
    const params = endpoint.params.filter(p => !p.main).map((param) => {
      const value = param.example ? `=${param.example}` : '';
      return `${param.name}${value}`;
    });

    const formattedParams = params.length > 0 ? `?${params.join('&')}` : '';
    const pathParam = mainParam ? `/:${mainParam.name}` : '';

    return `${basePath}${pathParam}${formattedParams}`;
  }

  return basePath;
}
