import { toBeHex } from 'ethers';

export const reportContractSchema = {
  // Real
  // uid: '0xb3e08a4b4e4d5f630f5a99978ad145cbe9eab4d9056764d5ae1dc7affcbc9649',

  // Fake
  uid: '0x83afd9a91bb9fc6178eccaac3ada2b308e841c4734e604ac6ee05baba196ce01',
  schemaEncoder: new SchemaEncoder("uint256 chainId, address contractAddress"),
}

export const reportDomainSchema = {
  // Real
  // uid: '0xeb484fecad7933bf4a88ee7f5308f167e5bdddfa6a751f618da49cd9497509af',

  // Fake
  uid: '0x6e5d0825f511b78440f9ff4e83bbaf4afeb51458bec3ca781612f2c944ef3d7f',
  schemaEncoder: new SchemaEncoder("string domainName"),
}

const EAS_SEPOLIA_GRAPH_QL = 'https://sepolia.easscan.org/graphql';

export async function getReportsByContract(chainId, contractAddress) {
  const r = await queryEASGraphQl(`
  query ReportsByContract {
    aggregateAttestation(where: {
      schemaId: {
        equals: "${reportContractSchema.uid}"
      }
      AND: [
        {
          decodedDataJson: {
            contains: "{\"name\":\"chainId\",\"type\":\"uint256\",\"value\":{\"type\":\"BigNumber\",\"hex\":\"${toBeHex(chainId)}\"}}"
          }
        },
        {
          decodedDataJson: {
            contains: "{\"name\":\"contractAddress\",\"type\":\"address\",\"value\":\"${contractAddress}\"}"
          }
        }
      ]
    }) {
      _count {
        id
      }
    }
  }
  `)
  if (!r) {
    return 0;
  }
  return r.aggregateAttestation._count.id;
}

export async function getReportsByDomainName(domainName) {
  const r = await queryEASGraphQl(`
  query ReportsByDomain {
    aggregateAttestation(where: {
      schemaId: {
        equals: "${reportDomainSchema.uid}"
      }
      decodedDataJson: {
        contains: "{\"name\":\"domainName\",\"type\":\"string\",\"value\":\"${domainName}\"}"
      }
    }) {
      _count {
        id
      }
    }
  }
  `)
  if (!r) {
    return 0;
  }
  return r.aggregateAttestation._count.id;
}

async function queryEASGraphQl(query) {
  const r = await fetch(EAS_SEPOLIA_GRAPH_QL, {
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

  const b = await r.json()

  console.debug('eas graphql response', b)

  return b.data;
}
