import { Box, Typography,Chip } from "@mui/material";
import{ DrawnCard } from "@/types/type";
import {useState } from "react";

interface TarotCardProps {
    drawn:DrawnCard;
}

const getImageName = (nameShort:string):string => {
    if(nameShort.startsWith("ar")) {
        const num= parseInt(nameShort.slice(2),10)-1;
        return`m${num.toString().padStart(2,"0")}`;
    }
    const suitMap: Record<string,string> ={
        cu:"c",
        wa:"w",
        sw:"s",
        pe:"p",
    }
    const suit = suitMap[nameShort.slice(0,2)];
    const rest = nameShort.slice(2);
    const rankMap : Record<string, string> ={
        ac: "01", "02": "02", "03": "03", "04": "04", "05": "05",
        "06": "06", "07": "07", "08": "08", "09": "09", "10": "10",
        pa: "11", kn: "12", qu: "13", ki: "14",
    }
    const rank = rankMap[rest] ?? rest;
    return`${suit}${rank}`;
}

const TarotCardComponent = ({ drawn }:TarotCardProps ) => {
    const { card, position, reversed } = drawn;
    const imageName = getImageName(card.name_short);
    const imageUrl =`https://raw.githubusercontent.com/metabismuth/tarot-json/master/cards/${imageName}.jpg`;

    const [ flipped, setFlipped] = useState(false);
    
    return (
        
        <Box 
        onClick={() => setFlipped(true)}

        sx={{
            perspective:"1000px",
            cursor: flipped ? "default" : "pointer" ,
            height:"100%",                   
        }}      
        >
            <Box
            sx={{
                position:"relative",
                width:"100%",
                minHeight:{ xs:360, md:440 },
                transformStyle:"preserve-3d",
                transition:"transform 0.6s",
                transform:flipped ? "rotateY(180deg)" : "rotateY(0)",
            }}>
                <Box
                    sx={{
                        position: "absolute",
                        width:"100%",
                        height:"100%",
                        backfaceVisibility:"hidden",
                        borderRadius:"16px",
                        border: "0.5px solid rgba(201,184,255,0.15)",
                        background: "linear-gradient(160deg, #251b40, #1a1230)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "3rem",
                    }}
                >
                    🔮
                </Box>

                <Box
                sx={{
                    position:"absolute",
                    width:"100%",
                    height:"100%",
                    backfaceVisibility:"hidden",
                    transform:"rotateY(180deg)",
                    borderRadius:"16px",
                    overflow:"hidden",
                    border:"0.5px solid rgba(201,184,255,0.15)",
                    background:"linear-gradient(160deg, #1e1535, #2a1f45)",                 
                }}
            >
                <Box
                sx={{
                    height:{ xs:220, md:280 },
                    display:'flex',
                    alignItems:'center',
                    justifyContent:"center",
                    background:"linear-gradient(160deg,#251b40,#1a1230)",
                    p:1.5,
                }}
                >
                    
                <Box
                component="img"
                src={imageUrl}
                alt={card.name}
                sx={{
                    maxHeight:"100%",
                    maxWidth:"100%",
                    borderRadius:"8px",
                    transform:reversed ? "rotate(180deg)" :"none",
                    boxShadow:"0 4px 16px rgba(0,0,0,0.4)",
                }}
                />       
            </Box>

            <Box sx={{ p:2 }}>
                    <Box
                    sx={{display:"flex",
                        justifyContent:"space-between",
                        alignItems:"center",
                        mb:1,
                    }}
                    >
                        <Typography
                        variant="caption"
                        sx={{
                            color:"rgba(201,184,255,0.5)",
                            textTransform:"uppercase",
                            letterSpacing:"0.06em",
                            fontSize:"9px",
                        }}
                        >
                            {position}
                        </Typography>
                        {reversed && (
                            <Chip
                            label="Reversed"
                            size="small"
                            sx={{
                                fontSize:"14px",
                                height:22,
                                background:"rgba(196,92,138,0.15)",
                                color:"secondary.light",
                                border: "0.5px solid rgba(196,92,138,0.3)"
                            }}
                            />                       
                        )}
                    </Box>

                    <Typography
                    variant="h6"
                    sx={{
                        fontSize:"13px",
                        color:"primary.light",
                        mb:0.5,
                        fontWeight:500,
                    }}
                    >
                        {card.name}
                    </Typography>

                    <Typography
                    variant="body2"
                    sx={{
                        fontSize:"11px",
                        color:"rgba(255,255,255,0.4)",
                        lineHeight:1.5,
                    }}
                    >
                        {reversed ? card.meaning_rev :card.meaning_up}
                    </Typography>
                </Box>                  
            </Box>
        </Box>
    </Box>
            
                       
    );
}

export default TarotCardComponent;
