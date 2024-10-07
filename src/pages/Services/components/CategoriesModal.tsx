import { Checkbox, Input, Modal, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { Position } from 'src/pages/RegisterPage/RegisterPage.props';

const CategoriesModal = ({ visible, onClose, positions, setCategoryIds, categoryIds } : 
    { visible: boolean, onClose: () => void, positions: Position[] | undefined ,
      setCategoryIds: React.Dispatch<React.SetStateAction<string[]>>,
      categoryIds: string[]
  }) => {
    const { Search } = Input;

    const [searchText, setSearchText] = useState('');
    const [selectedItems, setSelectedItems] = useState<string[]>(categoryIds ?? []);
    const [filteredPositions, setFilteredPositions] = useState<Position[]>([]);

    useEffect(() => {
        if (positions) {
            setFilteredPositions(
                positions.filter(option =>
                    option.positionName.toLowerCase().includes(searchText.toLowerCase())
                )
            );
        }
    }, [searchText, positions]);

    return (
        <Modal
            title="Select positions"
            open={visible}
            onCancel={() => {
                setSelectedItems(categoryIds ?? [])
                setSearchText('');
                onClose();
            }}
            onOk={() => { 
                setCategoryIds(selectedItems);
                setSearchText('');
                onClose();
            }}
            okText={"Submit"}
            cancelText={"Cancel"}
            styles={{ content: { width: 'max-content' }, body: { padding: '10px' }, header: { paddingBottom: '10px', borderBottom: '1px solid lightgrey' } }}
        >
            <Search 
                placeholder="Search..." 
                onChange={(e) => setSearchText(e.target.value)} 
                allowClear 
                value={searchText} 
                style={{ marginBottom: "10px" }} 
            />
            <div>
                <Checkbox.Group
                    style={{ display: "grid", gap: "10px", gridTemplateColumns: "repeat(3, 1fr)" }} 
                    value={selectedItems}
                    onChange={(checkedValues) => setSelectedItems(checkedValues)}
                >
                    {filteredPositions.map(option => (
                        <Checkbox key={option.id} value={option.id}>
                            <Tooltip title={option.positionName}>
                                {option.positionName}
                            </Tooltip>
                        </Checkbox>
                    ))}
                </Checkbox.Group>
                {filteredPositions.length === 0 && <p>Sorry, there are no positions like that. Please try another keyword...</p>}
            </div>
        </Modal>
    );
};

export default CategoriesModal;
