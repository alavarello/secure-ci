import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import ReportContractButton from "../ReportButton/attest-report-contract";
import ReportsContract from "../Reports/reports-contract";

interface AddressTableProps {
    addresses: string[]
    canMutate: boolean
  }

export const AddressesTable: React.FC<AddressTableProps> = ({ addresses, canMutate }) => {

    const handleRemove = (address: string) => {
        console.log('Removeing address', address)
        // TODO: Add request to back-end to remove address + re-render table values
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
                          chainId={1}
                          contractAddress={address}
                        />
                        <ReportsContract
                          chainId={1}
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