import { Box, Typography,Chip } from "@mui/material";
import{ DrawnCard } from "@/types/type";

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


    return (
        <Box 
        
        sx={{
            height:"100%",
            background:"linear-gradient(160deg, #1e1535, #2a1f45)",
            border:"0.5px solid rgba(201,184,255,0.15)",
            borderRadius:"16px",
            overflow:"hidden",
            transition:"transform 0.2s, box-shadow 0.2s",
            "&:hover":{
                transform:"translateY(-4px)",
                boxShadow:"0 12px 32px rgba(123,94,167,0.3)",
            }
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
                                fontSize:"18px",
                                height:16,
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
    );
}

export default TarotCardComponent;
