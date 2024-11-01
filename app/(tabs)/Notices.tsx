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
import Icon from '@expo/vector-icons/Ionicons'; // Importing Ionicons

export interface Notice {
    _id: string;
    title: string;
    notice: string;
    date: string;
    time: string;
    user: string;
}

export const API_URL = "https://school-connect-server.vercel.app";

const Notices: React.FC = () => {
    const [notices, setNotices] = useState<Notice[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newNotice, setNewNotice] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [currentNoticeId, setCurrentNoticeId] = useState<string | null>(null);
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [role, setRole] = useState<string>("teacher"); // Change this to "teacher" or "student" as needed

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
                    console.log('New notice added:', response.data); // Debug log
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
            {role === "teacher" && (
                <View style={styles.noticeButtonContainer}>
                    <TouchableOpacity onPress={() => handleEditClick(item)}>
                        <Icon name="create-outline" size={16} color="#007BFF" style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDelete(item._id)}>
                        <Icon name="trash-outline" size={16} color="#F44336" style={styles.icon} />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Notice Board</Text>
            <FlatList
                data={notices}
                keyExtractor={(item) => item._id}
                renderItem={renderNoticeItem}
            />
            {role === "teacher" && (
                <View style={styles.addButtonContainer}>
                    <Button
                        title="Add Notice"
                        onPress={() => setModalVisible(true)}
                        color="#007BFF"
                    />
                </View>
            )}

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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#FFFFFF",
    },
    header: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 16,
        color: "#333333",
        textAlign: "center",
    },
    noticeItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: 16,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: "#DDDDDD",
        borderRadius: 12,
        backgroundColor: "#F8F8F8",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 1,
    },
    noticeContentContainer: {
        flex: 1,
        marginRight: 10,
    },
    noticeTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333333",
    },
    noticeContent: {
        fontSize: 16,
        color: "#555555",
        marginTop: 4,
    },
    noticeButtonContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        marginHorizontal: 4, // Space between icons
    },
    addButtonContainer: {
        marginTop: 16,
        backgroundColor: "#007BFF",
        borderRadius: 8,
        overflow: "hidden",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    modalContent: {
        width: "85%",
        backgroundColor: "#FFFFFF",
        padding: 30,
        borderRadius: 12,
        elevation: 4,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#333333",
        marginBottom: 15,
        textAlign: "center",
    },
    input: {
        width: "100%",
        padding: 12,
        borderWidth: 1,
        borderColor: "#CCCCCC",
        borderRadius: 8,
        backgroundColor: "#F5F5F5",
        color: "#333333",
        marginBottom: 12,
    },
    textArea: {
        height: 100,
        textAlignVertical: "top",
    },
    modalButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 15,
    },
    modalButton: {
        flex: 1,
        padding: 12,
        marginHorizontal: 5,
        borderRadius: 8,
        alignItems: "center",
    },
    submitButton: {
        backgroundColor: "#28A745",
    },
    cancelButton: {
        backgroundColor: "#DC3545",
    },
    buttonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 16,
    },
    eventDateTime: {
        paddingTop: 8,
        color: "#777777",
    },
});

export default Notices;
