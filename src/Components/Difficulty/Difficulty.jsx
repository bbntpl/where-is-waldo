//import fontawesome library
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faDragon, faOtter, faSpider } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//assets
import { DIFF_SELECTOR } from '../../Assets/selector_colors';

//styled components
import {
    DifficultyContainer,
    DifficultyInnerCircle,
    DifficultyOuterCircle
} from './Difficulty_Styled';
library.add(fab, faDragon, faOtter, faSpider)

export default function Difficulty({setDiffPreview, setDiffLvl}) {
    const renderDifficultySelector = DIFF_SELECTOR.map((diff, i) => {
        //Switch to Preview component based on selected difficulty
        function previewMode(i, toggle) {
            setDiffPreview({ toggle: toggle });
            setDiffLvl(i);
        }
        return (
            <DifficultyOuterCircle
                key={i + 1}
                bsinset={diff.shadowcolor}
                bgoutertop={diff.outercolor}
                bgouterbottom={diff.outercolor2}
                onClick={() => previewMode(i+1, true)}
            >
                <DifficultyInnerCircle
                    index={i + 1}
                    iconcolor={diff.iconcolor}
                    innerdark={diff.innerdark}
                    innerlight={diff.innerlight}
                    inneredge={diff.inneredge}
                >
                    <FontAwesomeIcon icon={diff.icon} />
                </DifficultyInnerCircle>
            </DifficultyOuterCircle>
        )
    })

    return (
        <DifficultyContainer>
            {renderDifficultySelector}
        </DifficultyContainer>
    )
}