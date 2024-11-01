import React, { useState, useEffect } from 'react';
import { View, Text, RefreshControl } from 'react-native';
import { Agenda } from 'react-native-calendars';
import axios from 'axios';
import { Notice, API_URL } from '../../app/(tabs)/Notices';

const AgendaScreen: React.FC = () => {
    const [items, setItems] = useState({});
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchNotices();
    }, []);

    const fetchNotices = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/notice`);
            const notices: Notice[] = response.data;
            
            // Transform notices into agenda items
            const agendaItems: { [key: string]: any[] } = {};
            
            notices.forEach((notice) => {
                const dateStr = notice.date.split('T')[0]; // Format: YYYY-MM-DD
                
                if (!agendaItems[dateStr]) {
                    agendaItems[dateStr] = [];
                }
                
                agendaItems[dateStr].push({
                    name: notice.title,
                    description: notice.notice,
                    time: notice.time
                });
            });
            
            setItems(agendaItems);
            console.log('Fetched notices:', agendaItems); // Debug log
        } catch (error) {
            console.error('Error fetching notices:', error);
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchNotices();
        setRefreshing(false);
    };

    const renderItem = (item: any) => {
        return (
            <View style={{
                backgroundColor: 'white',
                borderRadius: 5,
                padding: 10,
                marginRight: 10,
                marginTop: 17,
            }}>
                <Text>{item.name}</Text>
                <Text>{item.description}</Text>
                <Text>Time: {item.time}</Text>
            </View>
        );
    };

    return (
        <Agenda
            items={items}
            renderItem={renderItem}
            selected={new Date().toISOString().split('T')[0]}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                />
            }
            refreshing={refreshing}
            onRefresh={handleRefresh}
        />
    );
};

export default AgendaScreen;
