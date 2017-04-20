export function getFullLink(domain, endpoint) {
  const basePath = `${domain}${endpoint.url}`;

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

export function curlBuilder(domain, data) {
  const method = data.method.toUpperCase();
  let modifiedDomain = domain;

  if (domain[domain.length - 1] === '/') {
    modifiedDomain = modifiedDomain.substring(0, domain.length - 1);
  }

  const url = `${modifiedDomain}${data.url}`;
  const headers = data.headers.map(h => `\n  -H "${h.name}: ${h.example}"`).join('');

  return `curl ${method} "${url}" ${headers}`;
}
