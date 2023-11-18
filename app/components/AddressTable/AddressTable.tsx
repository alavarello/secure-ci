import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import ReportContractButton from "../ReportButton/attest-report-contract";
import ReportsContract from "../Reports/reports-contract";

interface AddressTableProps {
    chainId: number
    addresses: string[]
    canMutate: boolean
    onRemove: (address: string) => void
  }

export const AddressesTable: React.FC<AddressTableProps> = ({
  chainId = 1,
  addresses,
  canMutate = false,
  onRemove,
}: {
  chainId: number,
  addresses: string[],
  canMutate: boolean,
  onRemove: (address: string) => void,
}) => {

    const handleRemove = (address: string) => {
        console.log('Removeing address', address)
        // TODO: Add request to back-end to remove address + re-render table values
        onRemove?.(address)
    }

    return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {addresses.map((address) => (
              <TableRow
                key={address}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {address}
                </TableCell>
                <TableCell>
                        <ReportContractButton
                          chainId={chainId}
                          contractAddress={address}
                        />
                        <ReportsContract
                          chainId={chainId}
                          contractAddress={address}
                        />
                </TableCell>
                {canMutate && <TableCell align="right" onClick={() => handleRemove(address)}>X</TableCell>} 
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
);
}


export default AddressTableProps;