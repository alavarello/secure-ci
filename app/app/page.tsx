import { ThemeProvider } from '@mui/material/styles';
import {Box, Container, InputAdornment, TextField, Typography} from "@mui/material";
import Header from "@/app/components/Header/header";
import {AccountCircle} from "@mui/icons-material";
import {FormControl} from "@mui/base";

export default function Home() {
  return (
      <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white text-black">
            <Container>
                <Box>
                    <Typography variant="h2">SCI</Typography>
                    <FormControl>
                    <TextField label="Outlined" variant="outlined" >
                        <InputAdornment position="end">
                            <AccountCircle />
                        </InputAdornment>
                    </TextField>
                    </FormControl>
                </Box>
            </Container>
        </main>
      </>
  )
}
