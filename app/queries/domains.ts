export interface DomainContractsData {
  id: string
  domainOwner: string
  contracts: Array<{chainId: string, address: string}>
}

interface DomainContractsGraphQLResponseQuery {
  data: {
    domains: Array<{
      id: string
      domainOwner: string
      contracts: Array<{contract: {chainId: string, address: string}}>
    }>
  }
}


async function queryTheGraphGraphQl(query: any) {
  const r = await fetch('https://api.thegraph.com/subgraphs/name/alavarello/sci-goerli', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      query,
    })
  })

  if (r.status !== 200) {
    return null;
  }

  const b: DomainContractsGraphQLResponseQuery = await r.json()
  return b.data;
}

export async function getDomainWhitelistedAddresses(domain?: string): Promise<DomainContractsData | null> {
  if(!domain) return null
  
  const response = await queryTheGraphGraphQl(`
    query DomainWhitelistedAddresses {
        domains(where:{id: "${domain}"}) {
            id
            domainOwner
            contracts {
                contract {
                    chainId
                    address
                }
            }
        }
      }
  `)
  if (!response) return null;

  return response.domains.map((val) => {
    return {
      id: val.id,
      domainOwner: val.domainOwner,
      contracts: val.contracts.map((val2) => {
        console.log('asdfe', val2)
        return {
          address: val2.contract.address,
          chainId: val2.contract.chainId
        }
      })
    }
  })[0] 
}
  