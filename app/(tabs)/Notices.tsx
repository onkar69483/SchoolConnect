import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Modal,
    TextInput,
    TouchableOpacity,
    Button,
} from "react-native";
import axios from "axios";
import DatePicker from "react-native-date-picker";
import { LinearGradient } from "expo-linear-gradient";

const API_URL = "https://school-connect-server.vercel.app"

interface Notice {
    _id: string;
    title: string;
    notice: string;
    date: string;
    time: string;
    user: string;
}

const Notices: React.FC = () => {
    const [notices, setNotices] = useState<Notice[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newNotice, setNewNotice] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [currentNoticeId, setCurrentNoticeId] = useState<string | null>(null);
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/notice`);
                setNotices(response.data);
            } catch (error) {
                console.error("Error fetching notices:", error);
            }
        };

        fetchNotices();
    }, []);

    const handleDelete = async (noticeId: string) => {
        try {
            const response = await axios.delete(`${API_URL}/api/notice/${noticeId}`);
            if (response.status === 200) {
                setNotices(notices.filter((notice) => notice._id !== noticeId));
                alert("Notice deleted successfully.");
            } else {
                alert("Failed to delete notice.");
            }
        } catch (error) {
            console.error("Error deleting notice:", error);
            alert("An error occurred while deleting the notice.");
        }
    };

    const handleEditClick = (notice: Notice) => {
        setNewTitle(notice.title);
        setNewNotice(notice.notice);
        setDate(new Date(notice.date));
        setCurrentNoticeId(notice._id);
        setEditMode(true);
        setModalVisible(true);
    };

    const handleEdit = async () => {
        if (newTitle && newNotice && currentNoticeId) {
            const updatedNotice = {
                title: newTitle,
                notice: newNotice,
                date: date.toISOString(),
                time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                user: "66de790a1f34eeb2296addaa",
            };

            try {
                const response = await axios.put(
                    `${API_URL}/api/notice/${currentNoticeId}`,
                    updatedNotice
                );

                if (response.status === 200) {
                    setNotices(
                        notices.map((notice) =>
                            notice._id === currentNoticeId ? response.data : notice
                        )
                    );
                    setNewTitle("");
                    setNewNotice("");
                    setModalVisible(false);
                    setEditMode(false);
                    alert("Notice updated successfully.");
                } else {
                    alert(`Error: ${response.data.error}`);
                }
            } catch (err) {
                console.error("Error updating notice:", err);
                alert("An error occurred while updating the notice.");
            }
        } else {
            alert("Please fill in both the title and content.");
        }
    };

    const handleAddNotice = async () => {
        if (newTitle && newNotice) {
            const newNoticeItem = {
                title: newTitle,
                notice: newNotice,
                date: date.toISOString(),
                time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                user: "66de790a1f34eeb2296addaa",
            };

            try {
                const response = await axios.post(
                    `${API_URL}/api/notice`,
                    newNoticeItem
                );

                if (response.status === 201) {
                    setNotices([...notices, response.data]);
                    setNewTitle("");
                    setNewNotice("");
                    setModalVisible(false);
                } else {
                    alert(`Error: ${response.data.error}`);
                }
            } catch (err) {
                console.error("Error posting notice:", err);
                alert("An error occurred while adding the notice.");
            }
        } else {
            alert("Please fill in both the title and content.");
        }
    };

    const renderNoticeItem = ({ item }: { item: Notice }) => (
        <View style={styles.noticeItem}>
            <View style={styles.noticeContentContainer}>
                <Text style={styles.noticeTitle}>{item.title}</Text>
                <Text style={styles.noticeContent}>{item.notice}</Text>
                <Text style={styles.eventDateTime}>
                    {`Date: ${new Date(item.date).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                    })}\nTime: ${item.time}`}
                </Text>
            </View>
            <View style={styles.noticeDateContainer}>
                <Text style={styles.noticeDate}>
                    {new Date(item.date).toISOString().split('T')[0]}
                </Text>
                <Text style={styles.noticeTime}>
                    {new Date(item.date).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                    })}
                </Text>
                <View style={styles.noticeButtonContainer}>
                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => handleEditClick(item)}
                    >
                        <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => handleDelete(item._id)}
                    >
                        <Text style={styles.noticeButtonText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <LinearGradient colors={["#1c1c1c", "#1c1c1c"]} style={styles.container}>
            <Text style={styles.header}>Notice Board</Text>
            <FlatList
                data={notices}
                keyExtractor={(item) => item._id}
                renderItem={renderNoticeItem}
            />
            <View style={styles.buttonContainer}>
                <Button
                    title="Add Notice"
                    onPress={() => setModalVisible(true)}
                    color="#007BFF"
                />
            </View>

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>
                            {editMode ? "Edit Notice" : "Add New Notice"}
                        </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Title"
                            placeholderTextColor="#aaa"
                            value={newTitle}
                            onChangeText={setNewTitle}
                        />
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Content"
                            placeholderTextColor="#aaa"
                            value={newNotice}
                            onChangeText={setNewNotice}
                            multiline={true}
                            numberOfLines={4}
                        />
                        <Button
                            title="Select date-time"
                            onPress={() => setOpen(true)}
                        />
                        <DatePicker
                            modal
                            open={open}
                            date={date}
                            onConfirm={(selectedDate) => {
                                setOpen(false);
                                setDate(selectedDate);
                            }}
                            onCancel={() => {
                                setOpen(false);
                            }}
                        />
                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.submitButton]}
                                onPress={editMode ? handleEdit : handleAddNotice}
                            >
                                <Text style={styles.buttonText}>
                                    {editMode ? "Update" : "Submit"}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => {
                                    setModalVisible(false);
                                    setEditMode(false);
                                }}
                            >
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#000000",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
        color: "#FFFFFF",
    },
    noticeItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: "#333333",
        borderRadius: 8,
        backgroundColor: "#2b2b2b",
    },
    noticeContentContainer: {
        flex: 1,
    },
    noticeTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
    noticeContent: {
        fontSize: 14,
        color: "#CCCCCC",
        marginTop: 8,
    },
    noticeDateContainer: {
        alignItems: "flex-end",
    },
    noticeDate: {
        fontSize: 12,
        color: "#AAAAAA",
    },
    noticeTime: {
        fontSize: 12,
        color: "#AAAAAA",
    },
    eventDateTime: {
        paddingTop: 8,
        color: "#AAAAAA",
    },
    buttonContainer: {
        marginTop: 16,
        backgroundColor: "#000000",
        borderRadius: 8,
        overflow: "hidden",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
    modalContent: {
        width: "80%",
        backgroundColor: "#333333",
        padding: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginBottom: 10,
    },
    input: {
        width: "100%",
        padding: 10,
        borderWidth: 1,
        borderColor: "#555555",
        borderRadius: 8,
        backgroundColor: "#444444",
        color: "#FFFFFF",
        marginBottom: 10,
    },
    textArea: {
        height: 100,
        textAlignVertical: "top",
    },
    modalButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    modalButton: {
        flex: 1,
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 8,
        alignItems: "center",
    },
    submitButton: {
        backgroundColor: "#007BFF",
    },
    cancelButton: {
        backgroundColor: "#444444",
    },
    buttonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
    },
    noticeButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    editButton: {
        backgroundColor: "#4CAF50",
        padding: 10,
        borderRadius: 5,
    },
    deleteButton: {
        backgroundColor: "#F44336",
        padding: 10,
        borderRadius: 5,
    },
    noticeButtonText: {
        color: "#fff",
        textAlign: "center",
    },
});

export default Notices;