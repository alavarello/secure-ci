import type { OnRpcRequestHandler, OnTransactionHandler } from '@metamask/snaps-types';
import { copyable, divider, heading, image, panel, text } from '@metamask/snaps-ui';

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
  chainId,
}) => {
  return {
    content: panel([
      heading('SCI Verification'),
      text(`Domain:, **${transactionOrigin}**!`),
      text(`On chain ${chainId}`),
      divider(),
      text('SCI Flags:'),
      text(`Domain reports ${0}`),
      text(`Contract reports ${0}`),
      divider(),
      text('Additional info can be found at:'),
      copyable(`_https://secureci.xyz/domains/${transactionOrigin?.split('//').at(1)}_`)
    ]),
  };
};
