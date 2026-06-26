'use client'

import { useState, useEffect } from "react";
import{
    Box,
    Container,
    Typography,
    Tabs,
    Tab,
    Badge,
} from "@mui/material";

import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import HistoryIcon from "@mui/icons-material/History";
import { ReadingType, DrawnCard, ReadingRecord, TarotCard } from "@/types/type";
import ReadingPanel from "@/components/ReadingPanel";
import HistoryPanel from "@/components/HistoryPanel";


const TarotApp = () => {
    const [tab, setTab ] = useState(0);
    const [readingType, setReadingType ] = useState<ReadingType>("Today");
    const [drawnCards, setDrawnCards ] = useState<DrawnCard[]>([]);
    const [loading, setLoading] = useState(false);
    const [ history, setHistory ] = useState<ReadingRecord[]>([]);
    const [isLoaded, setIsLoaded ] = useState(false);

    const handleTypeChange = (type: ReadingType ) => {
        setReadingType(type);
        setDrawnCards([]);
    }

    useEffect(() => {
        const stored = localStorage.getItem("tarotHistory");
        if(stored) setHistory(JSON.parse(stored));
        setIsLoaded(true);
    },[]);


    useEffect(() => {
        if(isLoaded) {
            localStorage.setItem("tarotHistory", JSON.stringify(history));
        }
    },[history, isLoaded])

    const drawCards = async () => {
        setLoading(true);
        setDrawnCards([]);
    const count = readingType === "Yes/No" ? 1:3;

        try {
            const res = await fetch(
                `https://tarotapi.dev/api/v1/cards/random?n=${count}`
            );

            const data = await res.json();
            const cards: TarotCard[] = data.cards;

            const positions:("Past" | "Present" | "Future" | "Answer")[] =
            readingType === "Yes/No"
            ?["Answer"]
            :["Past", "Present", "Future"];

            const drawn: DrawnCard[] = cards.map((card, i) => ({
                card,
                position:positions[i],
                reversed:Math.random() >0.7,
            }))

            setDrawnCards(drawn);

            const record: ReadingRecord ={
                id:Date.now(). toString(),
                type: readingType,
                cards:drawn,
                createdAt: new Date().toLocaleDateString("en-US",{
                    month:"short",
                    day:"numeric",
                    hour:"2-digit",
                    minute:"2-digit",
                })

            }
            setHistory((prev) => [record,...prev.slice(0, 19)]);
        } catch(error){
            console.error("Tarot API error:", error);
        }finally{
            setLoading(false);
        }
    }

    const deleteRecord = (id: string) => {
        setHistory((prev) => prev.filter((r) => r.id !== id));

    }

    return(
        <Box sx={{ minHeight:"100vh", bgcolor:"background.default"}}>
            <Box
            sx={{
                borderBottom:"0.5px solid rgba(255,255,255,0.06)",
                px:{xs:2, md:4},
                py:2,
                display:"flex",
                alignItems:"center",
                justifyContent:"space-between",
                flexWrap:"wrap",
                gap:2,
            }}
            >
                <Box
                    onClick={() => setTab(0)}
                    sx={{
                        display:"flex",
                        alignItems:"center",
                        gap:1.5,
                        cursor:"pointer",
                    }}
                >
                    <Box
                    sx={{
                        width:36,
                        height:36,
                        borderRadius:"10px",
                        background:"linear-gradient(135deg, #7B5EA7, #C45C8A)",
                        display:"flex",
                        alignItems:"center",
                        justifyContent:"center",
                        fontSize:"18px",
                    }}
                    >
                        🔮
                    </Box>
                    <Box>
                    <Typography variant="h6" sx={{ fontSize:"15px", lineHeight:1.2 }}>
                        Mystic Tarot
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize:"10px", color:"text.secondary"}}>
                        Your daily reading
                    </Typography>
                </Box>               
                </Box>                                
       
            <Tabs
            value={tab}
            onChange={(_,v) => setTab(v)}
            sx={{
                background:"rgba(255,255,255,0.04)",
                borderRadius:"20px",
                minHeight:36,
                "& .MuiTabs-indicator": {
                    borderRadius:"20px",
                    background:"rgba(255,255,255,0.1)",
                    height:"100%",
                    top:0,
                },
                "& .MuiTab-root": {
                    minHeight:36,
                    py:0,
                    fontSize:"12px",
                    textTransform:"none",
                    fontWeight:500,
                    color:"rgba(255,255,255,0.4)",
                    zIndex:1,
                    "&.Mui-selected":{ color:"#fff"},
                },       
            }}
            >
                <Tab
                label="Reading"
                icon={<AutoStoriesIcon sx={{ fontSize:14}} />}
                iconPosition="start"
                />

                <Tab
                label={
                    <Badge  badgeContent={history.length} color="primary" max={99}>
                        <Box sx={{ pr:history.length> 0 ? 1.5 :0 }}>History</Box>
                    </Badge>
                }
                icon={<HistoryIcon sx={{ fontSize:14}} />}
                iconPosition="start"
                />
            </Tabs>
            </Box>
            

            <Container maxWidth="md" sx={{ py:4}}>
            {tab === 0 &&(
                <ReadingPanel
                readingType={readingType}
                setReadingType={handleTypeChange}
                drawnCards={drawnCards}
                loading={loading}
                onDraw={drawCards}
                 />
            )}
            {tab === 1 && (
                <HistoryPanel history={history} onDelete={deleteRecord} />
            )}
        </Container>
        </Box>
    )
}

export default TarotApp;
