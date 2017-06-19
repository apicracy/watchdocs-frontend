export function getFullLink(domain, endpoint) {
  const basePath = `${domain || ''}${endpoint.url}`;

  if (endpoint.params) {
    const mainParam = endpoint.url_params.find(p => p.is_part_of_url);
    const params = endpoint.url_params.filter(p => !p.is_part_of_url).map((param) => {
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
  const headers = data.request ? (
    data.request.headers
      .map(h => `\n  -H "${h.key}: ${h.example_value}"`)
      .join('')
    ) : '';

  return `curl ${method} "${url}" ${headers}`;
}
