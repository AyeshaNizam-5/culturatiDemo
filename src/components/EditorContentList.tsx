import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { sampleGameContent, sampleRouteContent } from "@/lib/sample-data";
import { API_BASE_URL } from "@/config/apiConfig"
import api from "@/services/api"


const EditorContentList = () => {
  const [contentList, setContentList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const navigate = useNavigate();
  const [gameContent, setGameContent] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`${API_BASE_URL}/tenant/game-content`);
        setGameContent(response.data);
      } catch (error) {
        setError("Failed to fetch game content");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log("gameContent", gameContent)


  useEffect(() => {
    const normalizeGame = gameContent.map((item) => ({
      id: `game-${item.id}`,
      type: "game",
      contentName: item.question,
      relatedItem: item.relatedItem,
      language: item.language,
      category: item.category,
      level: item.level,
      gameType: item.gameType,
      creationDate: item.creationDate || new Date().toISOString(),
      status: item.status || "pending"
    }));

    console.log("normalizeGame", normalizeGame)
    const normalizeRoute = sampleRouteContent.map((item) => ({
      id: `route-${item.id}`,
      type: "route",
      contentName: item.contentName,
      relatedItem: item.relatedItem,
      language: item.language,
      category: item.category,
      level: item.level,
      gameType: item.type,
      creationDate: item.creationDate || new Date().toISOString(),
      status: item.status || "pending"
    }));

    setContentList([...normalizeGame, ...normalizeRoute]);
  }, []);

  console.log("gameContent", gameContent) 

  const filteredContent = contentList.filter((item) => {
    const matchesSearch =
      item.contentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.relatedItem.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType ? item.type === filterType : true;
    const matchesStatus = filterStatus ? item.status === filterStatus : true;

    return matchesSearch && matchesType && matchesStatus;
  });

  const handleItemClick = (item) => {
    if (item.type === "game") {
      navigate(`/dashboard/editor/Game/edit/${item.id.replace("game-", "")}`);
    } else {
      navigate(`/dashboard/editor/Route/edit/${item.id.replace("route-", "")}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-xl font-bold text-[#0b6085]"> Recent Content</div>
      <div className="flex flex-wrap gap-4 items-center">
        <Input
          placeholder="Search by name or item..."
          className="max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="game">Game</SelectItem>
            <SelectItem value="route">Route</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={() => {
          setSearchTerm("");
          setFilterType("");
          setFilterStatus("");
        }}>Reset</Button>
      </div>

      <ScrollArea className="h-[500px] rounded-md border p-4">
        {filteredContent.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredContent.map((item) => (
              <Card
                key={item.id}
                className="p-4 cursor-pointer hover:bg-muted"
                onClick={() => handleItemClick(item)}
              >
                <h3 className="font-semibold text-lg text-primary mb-1">
                  {item.contentName}
                </h3>
                <p className="text-sm text-muted-foreground">
                  <strong>Type:</strong> {item.type} | <strong>Status:</strong> {item.status}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Category:</strong> {item.category} | <strong>Level:</strong> {item.level}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Language:</strong> {item.language} | <strong>Item:</strong> {item.relatedItem}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Created:</strong> {format(new Date(item.creationDate), "PPP p")}
                </p>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-6">
            No content found for current filters.
          </p>
        )}
      </ScrollArea>
    </div>
  );
};

export default EditorContentList;
