import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { API_URL } from "../../config/ApiUrl";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

function Sondage() {
  const [poll, setPoll] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handlePoll = async () => {
    try {
      const response = await fetch(`${API_URL}/getPollListe`);
      const data = await response.json();
      if (response.status === 200) {
        setPoll(data.polls);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handlePoll();
  }, []);

  const handleSondage = (item) => {
    navigate(`/sondage_details/${item.id}`);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Sondages
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 3,
          }}
        >
          {poll.map((sondage) => (
            <Card
              key={sondage.id}
              sx={{
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent sx={{ textAlign: "center", padding: 3 }}>
                <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
                  {sondage.title}
                </Typography>
                <Typography color="textSecondary" sx={{ mb: 2 }}>
                  {sondage.description}
                </Typography>
                <Button
                  onClick={() => handleSondage(sondage)}
                  variant="contained"
                  color="primary"
                  sx={{
                    mt: 2,
                    width: "100%",
                    textTransform: "none",
                    fontWeight: "bold",
                    transition: "background 0.3s",
                    "&:hover": {
                      backgroundColor: "#1565c0",
                    },
                  }}
                >
                  Voir Sondage
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default Sondage;
