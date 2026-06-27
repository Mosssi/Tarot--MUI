import {
    Box,
    Typography,
    Button,
    CircularProgress,
    Grid,
    Chip,
} from "@mui/material";

import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { ReadingType, DrawnCard } from "@/types/type";
import TarotCardComponent from "@/components/TarotCardComponent";

interface ReadingPanelProps {
    readingType:ReadingType;
    setReadingType: (t:ReadingType) => void;
    drawnCards: DrawnCard[];
    loading: boolean;
    onDraw:() => void;
}

const TYPES: { type:ReadingType; emoji:string } [] =[
    {type:"Today",emoji:"🌙"},
    {type:"Love", emoji:"💕"},
    {type:"Career" ,emoji:"💼"},
    {type:"Wellbeing" ,emoji:"🌿"},
    {type:"Yes/No" ,emoji:"🎱"},
];

const READINGS: Record<ReadingType, string> = {
    Today:"What does today hold for you",
    Love:"What does love have in store",
    Career:"Where is your path leading",
    Wellbeing:"How is your inner world?",
    "Yes/No": "Seek a clear answer from the cards.",
}

const ReadingPanel = ({
    readingType,
    setReadingType,
    drawnCards,
    loading,
    onDraw,
}: ReadingPanelProps) => {
    return(
        <Box>
            <Box sx={{ textAlign:"center", mb:4}}>
                <Typography
                variant="h4"
                sx={{
                    background:"linear-gradient(135deg, #C9B8FF, #F4A0C4)",
                    WebkitBackgroundClip:"text",
                    WebkitTextFillColor:"transparent",
                    backgroundClip:"text",
                    mb:1,
                    fontSize:{xs:"1.6rem", md:"2rem"},
                }}
                >
                    what does the universe say?
                </Typography>
                <Typography
                variant="body2"
                sx={{ color:"text.secondary", letterSpacing: "0.08em" }}
                >
                    {READINGS[readingType]}
                </Typography>
            </Box>

            <Box
            sx={{
                display:"flex",
                gap:1,
                justifyContent:"center",
                flexWrap:"wrap",
                mb:4,
            }}>
                {TYPES.map(({ type, emoji }) => (
                    <Chip
                    key={type}
                    label={`${emoji} ${type}`}
                    onClick={() => setReadingType(type)}
                    variant={readingType === type ? "filled" : "outlined"}
                    sx={{
                        cursor:"pointer",
                        borderColor:readingType === type
                        ? "primary.main"
                        : "rgba(255,255,255,0.12)",
                        background: readingType === type
                        ? "rgba(123,94,167,0.25)"
                        : "transparent",

                        color: readingType === type
                        ? "primary.light"
                        : "rgba(255,255,255,0.4)",
                        "&:hover":{
                            borderColor:"primary.light",
                            color:"primary.light",
                            background:"rgba(123,94,167,0.15)"
                        }
                    }}
                     />
                ))}
            </Box>

            {loading ? (
                <Box sx={{ display:"flex", justifyContent:"center", py:8 }}>
                    <CircularProgress sx={{ color:"primary.light"}} />
                </Box>
            ) :drawnCards.length > 0? (
                <Box sx={{ width:"100% "}}>
                    <Typography 
                    variant="body2"
                    sx={{
                        textAlign:"center",
                        color:"var(--color-text-dim)",
                        fontStyle:"italic",
                        letterSpacing:"0.08em",
                        mb:3,
                    }}
                    >
                        Tap each slot in turn
                    </Typography>

                <Grid container spacing={2} sx={{ justifyContent:"center", mb:4}} >
                    {drawnCards.map((drawn,i) => (
                        <Grid
                        key={i}
                        size={{ xs:12, sm:readingType === "Yes/No" ? 6:4}}
                        >
                            <TarotCardComponent drawn={drawn} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
            ) : (
                <Box
                sx={{ 
                    textAlign:"center",
                    py:8,
                    mb:4,
                    border:"0.5px dashed rgba(255,255,255,0.1)",
                    borderRadius:2,
                }}
                >
                    <Typography sx={{ fontSize:"3rem", mb:1 }} > 🃏 </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Draw your cards to begin the reading
                    </Typography>
                </Box>
            )}

            {drawnCards.length > 0 && (
                <Box
                sx={{
                    background:"rgba(255,255,255,0.03)",
                    border:"0.5px solid rgba(255,255,255,0.07)",
                    borderRadius:1,
                    p:3,
                    mb:4,
                }}
                >
                    <Typography
                    variant="caption"
                    sx={{
                        color:"text.secondary",
                        textTransform:"uppercase",
                        letterSpacing:"0.08em",
                        display:"block",
                        mb:1.5,
                    }}
                    >
                        ✨Your reading 
                    </Typography>

                    {readingType === "Yes/No" ?(
                        <Box sx={{ textAlign:"center" }}>
                            <Typography
                            variant="h4"
                            sx={{ background:drawnCards[0].reversed
                                ? "linear-gradient(135deg,#F4A0C4,#C45C8A)"
                                : "linear-gradient(135deg,#C9B8FF,#7B5EA7)",
                                WebkitBackgroundClip:"text",
                                WebkitTextFillColor:"transparent",
                                backgroundClip:"text",
                                mb:1,
                            }}
                            >
                                {drawnCards[0].reversed ? "Maybe Not" : "Yes!"}
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                                {drawnCards[0].card.name} -{" "} 
                                {drawnCards[0].reversed
                                ?drawnCards[0].card.meaning_rev
                                :drawnCards[0].card.meaning_up
                            }
                            </Typography>                            
                        </Box>
                    ) :(
                        <Typography
                        variant="body2"
                        sx={{ 
                            color:"rgba(255,255,255,0.65)",
                            lineHeight:1.8,
                            fontStyle:"italic",
                        }}
                        >
                            Your <strong>{drawnCards[0]?.position}</strong> is shaped by{" "}
                            <em>{drawnCards[0]?.card.name}</em> -{" "}
                            {drawnCards[0]?.reversed
                            ? drawnCards[0]?.card.meaning_rev
                            : drawnCards[0]?.card.meaning_up}
                            {drawnCards[1] && (
                                <>
                                {" "}In your{" "}
                                <strong>{drawnCards[1]?.position}</strong>,{" "}
                                <em>{drawnCards[1]?.card.name}</em> speaks of {" "}
                                {drawnCards[1]?.reversed
                                ? drawnCards[1]?.card.meaning_rev
                                : drawnCards[1]?.card.meaning_up
                                }
                                </>
                            )}
                            {drawnCards[2] && (
                                <>
                                {". "}Looking to your{" "}
                                <strong>{drawnCards[2]?.position}</strong>,{" "}
                                <em>{drawnCards[2]?.card.name}</em> suggests{" "}
                                {drawnCards[2]?.reversed
                                ? drawnCards[2]?.card.meaning_rev
                                : drawnCards[2]?.card.meaning_up}
                                </>
                            )}
                        </Typography>
                    )}
                </Box>
            )}

            <Box sx={{ textAlign:"center" }}>
                <Button
                variant="contained"
                size="large"
                onClick={onDraw}
                disabled={loading}
                startIcon={<AutoFixHighIcon />}
                sx={{
                    background:"linear-gradient(135deg, #7B5EA7, #C45C8A)",
                    px:5,
                    py:1.5,
                    fontSize:"14px",
                    borderRadius:"24px",
                    textTransform:"none",
                    fontWeight:500,
                    boxShadow:"0 4px 20px rgba(123,94,167,0.35)",
                    "&:hover":{
                        background:"linear-gradient(135deg, #6a4d96, #b34a79)",
                        boxShadow:"0 6px 28px rgba(123,94,167,0.5)",
                    }
                }}
                >
                    {drawnCards.length >0 ? "Draw Again" : "Draw Cards"}
                </Button>
            </Box>
        </Box>
    )
}

export default ReadingPanel;


