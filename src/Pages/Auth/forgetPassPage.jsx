import { Paper, TextField, Button, Box } from "@mui/material";

function ForgetPassPage() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Traitez la soumission du formulaire ici (par exemple, appel API)
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 400 }}>
        <div className="justify-center items-center mb-3 " >
            <h4 className="font-semibold text-lg text-gray-600 " >Mot de passe oublie</h4>
        </div>
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <TextField
            label="Adresse email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Envoyer
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default ForgetPassPage;
