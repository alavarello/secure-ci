interface GraphQLResponseBase {
  data: any;
}
export interface DomainContractsData {
  id: string
  domainOwner: string
  contracts: Array<{chainId: string, address: string}>
}

interface DomainContractsGraphQLResponseQuery extends GraphQLResponseBase {
  data: {
    domains: Array<{
      id: string
      domainOwner: string
      contracts: Array<{contract: {chainId: string, address: string}}>
    }>
  }
}
export interface ContractDomainsData {
  id: string;
  chainId: string;
  address: string;
  domains: Array<{ id: string, domainOwner: string }>;
}

interface ContractDomainsGraphQLResponseQuery extends GraphQLResponseBase {
  data: {
    contracts: Array<{
      id: string;
      chainId: string;
      address: string;
      domains: Array<{ domain: { id: string, domainOwner: string } }>;
    }>;
  };
}

async function queryTheGraphGraphQl<T extends GraphQLResponseBase>(query: any): Promise<ContractDomainsGraphQLResponseQuery
    | DomainContractsGraphQLResponseQuery | null> {
  const r = await fetch('https://api.thegraph.com/subgraphs/name/alavarello/sci-goerli', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      query,
    })
  });

  if (r.status !== 200) {
    return null;
  }

  const b: T = await r.json();
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
  const r = response as unknown as DomainContractsGraphQLResponseQuery['data'];
  return r.domains.map((val) => {
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
export async function getDomainsByContractAddress(contractAddress?: string): Promise<ContractDomainsData | null> {
  if (!contractAddress) return null;

  const response = await queryTheGraphGraphQl(`
    query DomainsByContractAddress {
      contracts(where: {address: "${contractAddress}"}) {
        id
        chainId
        address
        domains {
          domain {
            id
            domainOwner
          }
        }
      }
    }
  `);

  if (!response) return null;
  const r = response as unknown as ContractDomainsGraphQLResponseQuery['data'];
  return r.contracts.map((val) => {
    return {
      id: val.id,
      chainId: val.chainId,
      address: val.address,
      domains: val.domains.map((val2) => ({
        id: val2.domain.id,
        domainOwner: val2.domain.domainOwner
      }))
    };
  })[0];
}