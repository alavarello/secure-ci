import type { Json, OnRpcRequestHandler, OnTransactionHandler } from '@metamask/snaps-types';
import { copyable, divider, heading, panel, text } from '@metamask/snaps-ui';
// eslint-disable-next-line import/no-extraneous-dependencies
import { BigNumberish, toBeHex } from 'ethers';

export const reportContractSchema = {
  // Real
  // uid: '0xb3e08a4b4e4d5f630f5a99978ad145cbe9eab4d9056764d5ae1dc7affcbc9649',

  // Fake
  uid: '0x83afd9a91bb9fc6178eccaac3ada2b308e841c4734e604ac6ee05baba196ce01',
};

export const reportDomainSchema = {
  // Real
  // uid: '0xeb484fecad7933bf4a88ee7f5308f167e5bdddfa6a751f618da49cd9497509af',

  // Fake
  uid: '0x6e5d0825f511b78440f9ff4e83bbaf4afeb51458bec3ca781612f2c944ef3d7f',
};

const EAS_SEPOLIA_GRAPH_QL = 'https://sepolia.easscan.org/graphql';

export async function getReportsByContract(chainId: BigNumberish, contractAddress: string | number | boolean | Json[] | { [prop: string]: Json; } | null | undefined) {
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

export async function getReportsByDomainName(domainName: string | undefined) {
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

async function queryEASGraphQl(query: string) {
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


/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns The result of `snap_dialog`.
 * @throws If the request method is not valid for this snap.
 */
export const onRpcRequest: OnRpcRequestHandler = ({ origin, request }) => {
  console.log('requestinggg', request)
  switch (request.method) {
    case 'hello':
      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: panel([
            text(`Hello, **${origin}**!`),
            text('This custom confirmation is just for display purposes.'),
            text(
              'But you can edit the snap source code to make it do something, if you want to!',
            ),
          ]),
        },
      });
    default:
      throw new Error('Method not found.');
  }
};

export const onTransaction: OnTransactionHandler = async ({
  transactionOrigin,
  transaction,
  chainId,
}) => {
  const domain = transactionOrigin?.split('//').at(1);
  const chainNumber = chainId.split(':').at(1)

  const [reportsByContract, reportsByDomainName] = await Promise.all([
    getReportsByContract(chainNumber as unknown as BigNumberish, transaction.to),
    getReportsByDomainName(domain)
  ])

  return {
    content: panel([
      heading('SCI Verification'),
      text(`Origin: **${transactionOrigin}**!`),
      text(`Chain ${chainId}`),
      divider(),
      text('SCI Flags:'),
      text(`Domain reports ${reportsByDomainName}`),
      text(`Contract reports ${reportsByContract}`),
      divider(),
      text('Additional info can be found at:'),
      copyable(`https://secureci.xyz/domains/${domain}`)
    ]),
  };
};
